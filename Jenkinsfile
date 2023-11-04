pipeline {
  agent any
  stages {
    stage('Checkout Code') {
      steps {
        git(url: 'https://github.com/aqilsyahmi/test01.git', branch: 'main')
      }
    }

    stage('Build Code') {
      steps {
        sh '''# Navigate to the directory
cd /var/jenkins_home/workspace/test01_main

# Cleanup Docker resources to free up space
docker system prune -af --volumes

# Build and run Docker containers
docker-compose build
docker-compose up -d
'''
      }
    }

  }
}