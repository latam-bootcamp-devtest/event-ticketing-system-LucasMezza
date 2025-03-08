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