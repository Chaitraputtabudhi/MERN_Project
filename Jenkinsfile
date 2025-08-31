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
        stage('Start MongoDB') {
    steps {
        sh '''
            echo "Starting MongoDB container..."

            # Create shared network if not exists
            docker network create mern-net || true

            # Stop & remove old MongoDB container if it exists
            docker rm -f mongo || true

            # Start MongoDB container on shared network
            docker run -d --name mongo \
              --network mern-net \
              -p 27017:27017 \
              mongo
        '''
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
              --network mern-net \
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
            echo "Waiting for MongoDB to be ready..."
            until docker exec mongo mongosh --quiet --eval "db.stats()" basic-mern-app; do
              echo "MongoDB not ready yet..."
              sleep 5
            done

            echo "Checking if MongoDB needs seeding..."

            docker cp server/data/courses.json mongo:/data/courses.json

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
