function convertToString(casts) {
  let castsjoin = ""
  for (let val of casts) {
    castsjoin = castsjoin + val.name + " / "
  }
  return castsjoin.substring(0, castsjoin.length - 3)
}

function convertToInfos(casts) {
  const castsArr = []
  for (let val of casts) {
    const cast = {
      img:val.avatars?val.avatars.large:"",
      name:val.name
    }
    castsArr.push(cast)
  }
  return castsArr
}

export {
  convertToString,
  convertToInfos
}