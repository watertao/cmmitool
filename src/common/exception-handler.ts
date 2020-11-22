import infras from '@/common/infras'

const { logger } = infras

window.onerror = (message, source, lineno, colno, err) => {
  logger.error(message)
  window.alert(err)
}
