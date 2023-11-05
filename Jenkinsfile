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
/usr/bin/docker system prune -af --volumes

# Build and run Docker containers
/usr/local/bin/docker-compose build
/usr/local/bin/docker-compose up -d

# Run the functional tests
docker-compose exec -T frontend npm run functional-test

'''
      }
    }

  }
}