import React from "react"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "@components/Layout"
import { PostProps } from "@components/Post"
import prisma from '@lib/prisma';
import Router from "next/router";
import { useSession } from 'next-auth/react';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
  // const post = {
  //   id: 1,
  //   title: "Prisma is the perfect ORM for Next.js",
  //   content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
  //   published: false,
  // }
  // return {
  //   props: post,
  // }
}

async function publishPost(id:number) {
  await fetch(`http://localhost:3000/api/publish/${id}`,{
    method: 'PUT',
  });
  await Router.push('/');
};

async function deletePost(id: number): Promise<void> {
  await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

const Post: React.FC<PostProps> = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  
  const { data: session, status } = useSession();

  if(status === "loading"){
    return <div>Authenticating ...</div>;
  }
  let userHasValidSession = null;
  let postBelongsToUser = null;
  if (session) {
    userHasValidSession = Boolean(session);
    postBelongsToUser = session.user.email === props.author?.email;
  }

  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown source={props.content} />

        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}

        {!props.published && userHasValidSession && postBelongsToUser && (
            <button onClick={() => deletePost(props.id)}>Delete</button>
        )}

      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
