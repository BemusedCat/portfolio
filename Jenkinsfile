  pipeline {                                                                                                                 
      agent any                                                                                                              
   
      options {                                                                                                              
          timestamps()                                            
          buildDiscarder(logRotator(numToKeepStr: '10'))
      }                                                                                                                      
   
      stages {                                                                                                               
          stage('Checkout') {                                     
              steps {
                  echo "Building branch: ${env.BRANCH_NAME}"                                                                 
                  echo "Commit: ${env.GIT_COMMIT}"
              }                                                                                                              
          }                                                       
                                                                                                                             
          stage('Build') {                                        
              steps {
                  sh 'echo "Put your build command here, e.g. npm install && npm run build"'
              }                                                                                                              
          }                                                                                                                  
                                                                                                                             
          stage('Test') {                                                                                                    
              steps {                                             
                  sh 'echo "Put your test command here, e.g. npm test"'
              }
          }
      }

      post {
          success { echo 'Pipeline succeeded ' }
          failure { echo 'Pipeline failed ' }                                                                                
          always  { echo "Finished build #${env.BUILD_NUMBER}" }                                                             
      }                                                                                                                      
  }                  
