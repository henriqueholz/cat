import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetBreedsQuery } from './catApiSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectCat, updateCatList } from './catSlice'
import { UploadCatImageButton } from './components/UploadCatImageButton'
import { RemoveCatImageButton } from './components/RemoveCatImageButton'
import { ImageItem } from './components/ImageItem'

export const BreedInfo = () => {
  const id = useParams().id as string
  const [options, setOptions] = useState({
    page: 1,
    limit: 10
  })
  const { data, isFetching, error } = useGetBreedsQuery(options) // Fetch data from the cat API
  const dispatch = useAppDispatch()

  const cat = useAppSelector(state => selectCat(state, id))

  useEffect(() => {
    if (cat === undefined && data !== undefined) {
      dispatch(updateCatList(data))
    }
  }, [data])

  return (
    <>
      {cat !== undefined ? (
        <>
          <ImageItem cat={cat} />
          <UploadCatImageButton cat={cat} />
          <RemoveCatImageButton cat={cat} />
          <div>Temperament: {cat?.temperament}</div>
          <div>Adaptability: {cat?.adaptability}</div>
          <div>Affection: {cat?.affection_level}</div>
        </>
      ) : (
        ''
      )}
    </>
  )
}
