pipeline {
  agent any
  stages {
    stage('test') {
      steps {
        sh '''cd backend
npm install
npm run dev'''
      }
    }

  }
}