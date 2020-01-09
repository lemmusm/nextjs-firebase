import React, { Component } from 'react';
import Head from 'next/head';
import Nav from '../components/nav';

// Firebase
import loadFirebase from '../firebase.config';

class Home extends Component {
  static async getInitialProps() {
    const firebase = await loadFirebase();
    const db = firebase.firestore();
    let result = await new Promise((resolve, reject) => {
      db.collection('nextjs-fb')
        .get()
        .then(snapshot => {
          let data = [];
          snapshot.forEach(doc => {
            data.push(
              Object.assign(
                {
                  id: doc.id
                },
                doc.data()
              )
            );
          });
          resolve(data);
        })
        .catch(error => {
          reject([]);
        });
    });
    return { usuarios: result };
  }

  render() {
    const usuarios = this.props.usuarios;
    return (
      <div>
        <Head>
          <title>Home</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <Nav />

        <div className='hero'>
          <h1 className='title'>Welcome to Next.js with Firebase!</h1>

          <div className='row'>
            {usuarios.map(usuario => (
              <div className='card' id='data' key={usuario.id}>
                <img src={usuario.avatar} alt='Avatar' className='avatar' />
                <h3>{usuario.username}</h3>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .avatar {
            vertical-align: middle;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
