import { error } from "console"
import { stringify } from "querystring"

export async function strapiFetcher(url:string, option = {}) {
  let response
  if (!option) {
    response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${url}`)
  } else {
    response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/${url}`, option)
  }
  if (!response.ok) {
    return response.json()
    throw new Error('An error occurred while fetching the data.')
  } else {
    return response.json()
  }
}