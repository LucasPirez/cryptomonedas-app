import React, { useState, useEffect, Suspense, useMemo } from 'react'
import { pagination } from '../../client/client'
import CoinsRow from '../Row'
import { color } from '../../styles/colors'
import { useRouter } from 'next/router'
import SelectPage from './SelectPage'
import useIntersectionObserver from '../../hook/useIntersectionObserver'
import OrderTable from '../OrderTable'
import TableComponent from '../utilities/TableComponent'
import Link from 'next/link'
import Loading from '../Loading'
import { EPCoinsMarketsAdapter } from '../../adapters/EPCoinsMarketsAdapter'
import { useSelector } from 'react-redux'

export default function Table() {
  const { container, count, reInitCount, visible } = useIntersectionObserver()
  const router = useRouter()
  const { criptoList, currencySelect } = useSelector(
    (state) => state.criptoList
  )

  return (
    <>
      <div className='contain'>
        <table>
          <thead>
            <tr className='local_tr'>
              {criptoList !== [] && <TableComponent />}
            </tr>
          </thead>
          <tbody>
            {criptoList !== [] ? (
              criptoList.map((u, i) => {
                if (i < count) {
                  return (
                    <tr
                      key={u.id}
                      onClick={() =>
                        router.push(`http://localhost:3000/coin/${u.id}`)
                      }
                    >
                      <CoinsRow data={EPCoinsMarketsAdapter(u)} />
                    </tr>
                  )
                }
              })
            ) : (
              <tr>
                <td>
                  <Loading />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        ref={container}
        style={{ width: '100%', height: 30, background: 'trasparent' }}
      ></div>
      <SelectPage max={99} reInitCount={reInitCount} route={'criptos'} />
      <style jsx>
        {`
          table {
            min-height: '90vh';
            width: 100%;
            background: 'white';
            opacity: 0.96;
            border-collapse: collapse;
          }

          tr {
            height: 50px;
            border-bottom: 2px solid ${color.letters}50;
            cursor: pointer;
            transition: all 0.3s;
          }
          tbody {
            overflow-x: auto;
          }

          .contain {
            margin: auto;
            overflow-x: auto;
            max-width: 1150px;
            width: auto;
            min-height: 90vh;
          }

          .local_tr {
            height: 50px;
            border-bottom: 2px solid ${color.letters}50;
            cursor: pointer;
            transition: all 0.3s;
            width: 100%;
          }
        `}
      </style>{' '}
    </>
  )
}
