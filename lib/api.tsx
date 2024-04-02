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
    const res = response.json()
    
    return res
  } else {
    return response.json()
  }
}