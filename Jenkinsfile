pipeline {
    agent any
    environment {
        IMAGE_NAME = 'chaitraputtabudhi/mern-project-new'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Chaitraputtabudhi/MERN_Project',
                    credentialsId: 'Chaitraputtabudhi'
            }
        }

        stage('Build Docker Image') {
            steps {
               
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                      
            }
        }

        stage('Push to Dockerhub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'gitconnect', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME:latest
                        docker logout
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'echo "Deploying the application..."'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
        }
        success {
            echo 'Pipeline finished successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
