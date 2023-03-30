import ModalPortal from '../portal/ModalPortal'

export default function Error({ message }) {
  return (
    <>
      <ModalPortal>
        <div>
          <p>{message}</p>
        </div>
      </ModalPortal>
    </>
  )
}
