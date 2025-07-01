const toFirebaseKey = error => {
  const { code, name } = error

  return name === 'FirebaseError' && code ? `firebase.${code}` : null
}

export { toFirebaseKey }
