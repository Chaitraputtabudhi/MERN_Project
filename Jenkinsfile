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
        sh '''
            echo "Deploying the application..."

            # Stop & remove old container if it exists
            docker rm -f mern-app || true

            # Run new container from built image
            docker run -d --name mern-app \
              -p 5000:5000 \
              -e PORT=5000 \
              -e MONGO_URI=mongodb://mongo:27017/basic-mern-app \
              ${IMAGE_NAME}:latest
        '''
    }
}
       stage('Seed MongoDB') {
    steps {
        sh '''
            echo "Checking if MongoDB needs seeding..."

            # Copy JSON file into Mongo container
            docker cp server/data/courses.json mongo:/data/courses.json

            # Check if collection is empty
            EXISTING=$(docker exec mongo mongosh --quiet --eval "db.mern_app.countDocuments()" basic-mern-app)

            if [ "$EXISTING" -eq 0 ]; then
              echo "Seeding data..."
              docker exec mongo mongoimport \
                --db basic-mern-app \
                --collection mern_app \
                --file /data/courses.json \
                --jsonArray
            else
              echo "Data already exists. Skipping seeding."
            fi
        '''
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
