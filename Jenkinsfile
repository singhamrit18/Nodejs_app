pipeline {
    agent any

    environment {
        NODEJS_HOME = tool name: 'NodeJS' // Assumes NodeJS is configured in Jenkins tools
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        SONARQUBE_SERVER = 'SonarQube'  // Name configured for SonarQube in Jenkins
        NEXUS_URL = 'localhost:8081/' // Replace with your actual Nexus URL
        NEXUS_REPO = 'Nodejs_app' // Replace with your Nexus repository ID
        NEXUS_CREDENTIALS_ID = 'singhamrit18' // Jenkins credentials ID for Nexus
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the project...'
                sh 'npm run build'  // Assumes build command is defined in package.json
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
                withSonarQubeEnv('SonarQube') { // SONARQUBE_SERVER should match the name in Jenkins
                    sh 'sonar-scanner -Dsonar.projectKey=my-nodejs-project'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                script {
                    echo 'Waiting for SonarQube Quality Gate...'
                    timeout(time: 1, unit: 'MINUTES') {
                        waitForQualityGate abortPipeline: true
                    }
                }
            }
        }
        
        stage('Archive Artifact') {
            steps {
                echo 'Archiving build artifacts...'
                archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
            }
        }

        stage('Deploy to Nexus') {
            steps {
                echo 'Uploading artifact to Nexus...'
                nexusArtifactUploader(
                    nexusVersion: 'nexus3',
                    protocol: 'http',
                    nexusUrl: "${NEXUS_URL}",
                    repository: "${NEXUS_REPO}",
                    credentialsId: "${NEXUS_CREDENTIALS_ID}",
                    groupId: 'com.example', // Replace with your actual group ID
                    version: '1.0.0',
                    artifacts: [
                        [artifactId: 'my-app', classifier: '', file: 'dist/my-app.zip', type: 'zip']
                    ]
                )
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
