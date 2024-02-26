function formatCurrentDate() {
  const currentDate = new Date()

  const year = currentDate.getFullYear()
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
  const day = currentDate.getDate().toString().padStart(2, '0')
  const hours = currentDate.getHours().toString().padStart(2, '0')
  const minutes = currentDate.getMinutes().toString().padStart(2, '0')
  const seconds = currentDate.getSeconds().toString().padStart(2, '0')
  const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0')

  const offsetMinutes = currentDate.getTimezoneOffset()
  const offsetHours = Math.floor(offsetMinutes / 60)
  const offsetMinutesRemainder = offsetMinutes % 60
  const offsetSign = offsetHours >= 0 ? '-' : '+'

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${offsetSign}${Math.abs(
    offsetHours,
  )
    .toString()
    .padStart(2, '0')}:${offsetMinutesRemainder.toString().padStart(2, '0')}`

  return formattedDate
}

export default formatCurrentDate
