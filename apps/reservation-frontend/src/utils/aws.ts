import { NoSerialize } from "@builder.io/qwik"

type UploadData = (
  data: NoSerialize<File>,
  options: {
    path?: string
    debug?: boolean
    expiresIn: number
  }
) => Promise<Response | undefined>

type SignedURL = (id: string, path: string) => Promise<{ signedUrl: string } | undefined>

const getSignedURL: SignedURL = async (name, path) => {
  try {
    const response = await fetch("http://localhost:3030/presignurl", {
      method: "POST",
      headers: {
        "X-Service-Method": "putObject",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: name, path }),
    })
    return response.json()
  } catch (error) {
    console.log("error", error)
  }
}
const upload: UploadData = async function (data, options) {
  const { name } = data
  if (!options.path) throw new Error('create: missing "missing options.path" parameter')
  const { path } = options

  const { signedUrl }: string = await getSignedURL(name, path)
  try {
    return await fetch(signedUrl, {
      method: "PUT",
      body: data,
    })
  } catch (error) {
    console.log("error", error)
  }
}

export default upload