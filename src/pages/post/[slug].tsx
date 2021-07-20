import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({post}: PostProps) {
  return (
    <>
      <Header/>
        <img src="" alt="imagem" className={styles.banner} />
        <main className={commonStyles.container}>
          <div className={styles.post}>
            <div className={styles.postTop}>
              <h1>Alguma coisa ai de exemplo</h1>
              <ul>
                <li>
                  <FiCalendar />
                  16 Mar 2021
                </li>
                <li>
                  <FiUser />
                  Nikolas Santana
                </li>
                <li>
                  <FiClock />
                  5 minutos de leitura 
                </li>
              </ul>
            </div>

            <article>
              <h2>titulo da sessão</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nullam volutpat lacus quis sem ornare, sed laoreet ligula lobortis.
                Cras sagittis mauris at <a href="">Link qualquer</a> dui bibendum vestibulum. Curabitur malesuada
                luctus nisl, eget ullamcorper libero efficitur vitae. Donec a tellus
                quis sem consectetur accumsan a semper nulla. Nam dui odio, rhoncus id
                euismod a, blandit at ipsum. Praesent condimentum risus pharetra lacinia.
              </p>
            </article>
          </div>
        </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const prismic = getPrismicClient();
  // const posts = await prismic.query(TODO);

  return {
    paths: [],
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content,
    }
  }

  return {

  }
};
