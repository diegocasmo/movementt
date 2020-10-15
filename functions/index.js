const functions = require('firebase-functions')
const admin = require('firebase-admin')
const routinesSeed = require('./seed/routines.json')
const exercisesSeed = require('./seed/exercises.json')

admin.initializeApp()
const db = admin.database()

const getRoutinesRef = (uid) => `routines/${uid}`
const getRoutineRef = (uid, key) => `${getRoutinesRef(uid)}/${key}`
const getExercisesRef = (uid) => `exercises/${uid}`
const getExerciseRef = (uid, key) => `${getExercisesRef(uid)}/${key}`

exports.addRoutinesSeed = functions.auth.user().onCreate((user) => {
  const routines = routinesSeed.routines.map((routine) => {
    return {
      ...routine,
      createdAt: new Date().getTime(),
    }
  })

  let updates = {}
  routines.forEach((routine) => {
    const key = db.ref(getRoutinesRef(user.uid)).push().key
    updates[getRoutineRef(user.uid, key)] = routine
  })

  return db.ref().update(updates)
})

exports.addExercisesSeed = functions.auth.user().onCreate((user) => {
  const exercises = exercisesSeed.exercises.map((exercise) => {
    return {
      ...exercise,
      createdAt: new Date().getTime(),
    }
  })

  let updates = {}
  exercises.forEach((exercise) => {
    const key = db.ref(getExercisesRef(user.uid)).push().key
    updates[getExerciseRef(user.uid, key)] = exercise
  })

  return db.ref().update(updates)
})