import { useState } from 'react'
import ModalPortal from '../portal/ModalPortal'
import FormLogin from './FormLogin'
import FormSignUp from './FormSignUp'
import { Button } from 'primereact/button'

export default function Register({ first, onClose }) {
  const [login, setLogin] = useState(first)

  return (
    <>
      <ModalPortal>
        <section>
          <div className='container_title'>
            <i className='pi pi-times' onClick={onClose} />
            <h3>{login ? 'Login' : 'Sing Up'}</h3>
            <div className='container_conditional'>
              {login ? (
                <span>You not a User</span>
              ) : (
                <span>You are a User</span>
              )}
              <Button
                label={!login ? 'Login' : 'Sing Up'}
                outlined
                text
                severity='info'
                onClick={() => setLogin(!login)}
              />
            </div>
          </div>
          {login ? <FormLogin /> : <FormSignUp />}
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
          height: fit-content;
          background: #fafafa;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          border-radius: 4px;
          animation: aparecer 0.5s linear 1;
          padding: 30px 40px;
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
          color: var(--bluegray-600);
        }

        .container_title {
          width: 100%;
          height: auto;
          margin-left: 34px;
          line-height: 0.2;
        }

        .container_conditional {
          display: flex;
          align-items: center;
          margin: -20px 0 0;
        }

        a {
          color: #1a73e8;
          font-size: 1.1rem;
        }
        i {
          float: right;
        }
      `}</style>
    </>
  )
}
