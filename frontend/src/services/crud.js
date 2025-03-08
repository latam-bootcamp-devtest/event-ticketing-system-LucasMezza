export const getEvents = () => {
  return (
    fetch(`https://goldfish-app-fbulw.ondigitalocean.app/event?applicationId=d5b22b06-a188-4f7d-87fd-3632551bde15`, {
      method: "GET",
    })
    .then(res => res.json())
    .catch(err => {throw new Error(err)})
  )  
}

export const getEventById = (id) => {
  return (
    fetch(`https://goldfish-app-fbulw.ondigitalocean.app/event/${id}?applicationId=d5b22b06-a188-4f7d-87fd-3632551bde15`, {
      method: "GET",
    })
    .then(res => res.json())
    .catch(err => {throw new Error(err)})
  )  
}

export const addBook = (body) => {
  const bodyObj = {...body, applicationId: "d5b22b06-a188-4f7d-87fd-3632551bde15", userId: "3d76e5b8-2ae3-4a29-bb94-0d519fd5f206"}

  return (
    fetch(`https://goldfish-app-fbulw.ondigitalocean.app/booking`, {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(bodyObj)
    })
    .then(res => res)
    .catch(err => {throw new Error(err)})
  )  
}

export const getBooks = (id) => {
  return (
    fetch(`https://goldfish-app-fbulw.ondigitalocean.app/user/3d76e5b8-2ae3-4a29-bb94-0d519fd5f206/events?applicationId=d5b22b06-a188-4f7d-87fd-3632551bde15`, {
      method: "GET",
    })
    .then(res => res.json())
    .catch(err => {throw new Error(err)})
  )  
}