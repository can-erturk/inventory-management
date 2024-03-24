function formatDate(inputDate, isTime = false) {
  const date = new Date(inputDate)

  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const year = date.getFullYear()

  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)

  return isTime
    ? `${month}/${day}/${year} ${hours}:${minutes}`
    : `${month}/${day}/${year}`
}

export default formatDate
