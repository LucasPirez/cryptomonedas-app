// import react, { useState, useEffect, useRef } from 'react'
// import login from '../../client/clientUser'
import ModalPortal from '../portal/ModalPortal'
import FormLogin from './FormLogin'
import FormSignUp from './FormSignUp'

export default function SignUp() {
  return (
    <>
      <ModalPortal>
        <section>
          <div className='container_title'>
            <h3>Sign Up</h3>
            <p>
              You are a User
              <span>
                <a href='#'> Login</a>
              </span>
            </p>
          </div>
          <FormLogin />
        </section>
      </ModalPortal>
      <style jsx>{`
        section {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 10rem;
          max-width: 400px;
          width: 100%;
          height: 470px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          border-radius: 4px;
          animation: aparecer 0.5s linear 1;
        }

        @keyframes aparecer {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        h3 {
          font-size: 2rem;
        }

        .container_title {
          width: 100%;
          height: auto;
          padding: 1rem 2.3rem;
          line-height: 0.2;
        }
        a {
          color: #1a73e8;
          font-size: 1.1rem;
        }
      `}</style>
    </>
  )
}
