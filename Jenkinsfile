pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JagatheshwaranN/Playwright_TypeScript_Framework.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npm install -D allure-playwright'
                bat 'npm install -g allure-commandline --force'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright install'
                bat 'npm run %Tag%'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat 'allure generate ./allure-results --clean -o ./allure-report'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/**/*',
                             allowEmptyArchive: true

            allure includeProperties: false,
                   jdk: '',
                   results: [[path: 'allure-results']]
        }
    }
}