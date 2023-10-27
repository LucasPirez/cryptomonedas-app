import { color } from '../../styles/colors'
import ArrowDown from '../Icons/arrowDown'
import LinkExternal from '../Icons/LinkExternal'

export default function SubContent({ data }) {
  return (
    <>
      <div
        className='container'
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className='container_link'>
          <a
            href={data.homepage[0]}
            target='_blank'
            className='direct_link'
            rel='noreferrer'
          >
            Web Site
          </a>
          <span>
            <LinkExternal />
          </span>
        </div>
        <div className='container_link'>
          <a
            target='_blank'
            href={
              data.chat_url[0] !== ''
                ? data.chat_url[0]
                : data.chat_url[1] !== ''
                ? data.chat_url[1]
                : data.chat_url[2]
            }
            className='direct_link'
            rel='noreferrer'
          >
            Chat
          </a>
          <span>
            <LinkExternal />
          </span>
        </div>
        <div className='container_ocult container_link'>
          <p>Explorers</p>
          <span>
            <ArrowDown />
          </span>
          <div className='content_ocult'>
            {data.blockchain_site.map((u) => {
              if (u !== '') {
                return (
                  <a key={u} href={u} target='_blank' rel='noreferrer'>
                    {u.slice(8, 22)}
                  </a>
                )
              }
            })}
          </div>
        </div>
        <div className='container_ocult container_link'>
          <p>Community</p>{' '}
          <span>
            <ArrowDown />
          </span>
          <div className='content_ocult'>
            <a
              href={data.official_forum_url[0]}
              target='_blank'
              rel='noreferrer'
            >
              Forum.ethereum.org
            </a>
            <a
              href={`https://twitter.com/${data.twitter_screen_name}`}
              target='_blank'
              rel='noreferrer'
            >
              twitter.com{' '}
            </a>
            <a href={data.subreddit_url} target='_blank' rel='noreferrer'>
              reddit.com
            </a>
            <a
              href={`https://facebook.com/${data.facebook_username}`}
              target='_blank'
              rel='noreferrer'
            >
              facebook.com
            </a>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          a {
            font-weight: 600;
            display: block;
            margin: 5% 0;
          }
          span {
            cursor: text;
            margin-left: 2px;
          }
          p {
            font-weight: 600;
          }
          .container {
            width: 90%;
            margin: auto;
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 50px;
            background: ${color.letters};
            border-radius: 999px;
          }

          .direct_link {
            display: flex;
            font-weight: 600;
          }

          .container_ocult {
            position: relative;
          }

          .container_link {
            display: flex;
            align-items: center;
            height: 35px;
            padding: 0 7px;
            border-radius: 13px;
            transition: all 0.3s;
            color: ${color.lightBlue};
          }

          .container_link:hover {
            background: ${color.lightBlue};
            color: ${color.letters};
            cursor: pointer;
          }

          .content_ocult {
            position: absolute;
            background: ${color.letters};
            visibility: hidden;
            top: 50px;
            left: -50px;
            opacity: 0;
            padding: 5px;
            border-radius: 5px;
            color: ${color.lightBlue};
            transition: all 0.6s;
          }

          .content_ocult::before {
            content: '';
            position: absolute;
            top: -20px;
            left: 80px;
            width: 0;
            height: 0;
            border-right: 12px solid transparent;
            border-top: 10px solid transparent;
            border-left: 12px solid transparent;
            border-bottom: 10px solid ${color.letters};
            cursor: pointer;
          }

          .content_ocult > a {
            padding: 3px 10px;
            transition: all 0.3s;
            border-radius: 2px;
          }

          .content_ocult > a:hover {
            background: ${color.lightBlue};
            color: ${color.letters};
          }

          .container_ocult:hover > .content_ocult {
            visibility: visible;
            opacity: 1;
          }
        `}
      </style>
    </>
  )
}
