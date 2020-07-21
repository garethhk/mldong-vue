pipeline {
    agent any
    parameters {
        string(name: 'project_name', defaultValue: 'mldong-vue', description: '项目名称')        
        string(name: 'git_url', defaultValue: 'git@gitee.com:mldong/mldong-vue.git', description: '仓库地址')

        string(name: 'registry_url', defaultValue: "https://registry.npm.taobao.org", description: 'npm源地址')
        string(name: 'remote_host', defaultValue: "172.26.22.105", description: '远程服务器地址')
        string(name: 'deploy_type', defaultValue: 'deploy', description: '发布类型')
        string(name: 'branch_name', defaultValue: 'master', description: 'git分支')
        string(name: 'profiles', defaultValue: 'test', description: '环境')
        string(name: 'k8sCredentialsId', defaultValue: 'ali-k8s-config', description: 'k8s集群配置id')
        string(name: 'k8sServerUrl', defaultValue: 'https://172.26.22.121:6443', description: 'k8s集群服务地址')
        string(name: 'nfs_project_dir', defaultValue: '/mnt', description: 'nfs根目录')
        
    }
    stages {
        stage('检出代码') {
        	steps{
                // 检出代码
            	checkout([$class: 'GitSCM', branches: [[name: "*/${params.branch_name}"]], 
            	doGenerateSubmoduleConfigurations: false, 
            	extensions: [], 
            	submoduleCfg: [], 
                userRemoteConfigs: [[
                    credentialsId: 'mldong-gitbash', 
                	url: "${params.git_url}"]]])
            }
        }
        stage('打包生成静态文件') {
            agent {
                docker {
                    image 'node:10-alpine'
                    args '-p 3000:3000'
                }
            }
            steps {
                sh "node -v"
                sh "npm -v"
                sh "npm --registry=${params.registry_url} install --unsafe-perm"
                sh "npm run build:${params.profiles}"
                sh "tar -zcvf dist.tar.gz dist"
                stash name: "dist", includes: "dist.tar.gz"
            }
        }
        stage("kubectl deploy"){
            agent {
                docker {
                    image 'lwolf/helm-kubectl-docker'
                }
            }

            steps {
                withKubeConfig([credentialsId: "${params.k8sCredentialsId}", serverUrl: "${params.k8sServerUrl}"]) {
                    script {
                        sh "kubectl apply -f k8s-${params.profiles}.yaml"
                    }
                }
            }
		}
        stage("scp to remote") {
          steps {
            script {
                withCredentials([
           	 	sshUserPrivateKey(
                    credentialsId: 'mldong-gitbash', 
                    keyFileVariable: 'identity', 
                    passphraseVariable: '', 
                    usernameVariable: 'userName')
            	]) {
              	// 删除本地dist
              	sh "rm -rf dist"
              	// 取出stash的文件
              	unstash("dist")
              	// 解压
              	sh "tar zxvf dist.tar.gz"
              	// 移出index.html,留最后复制
              	sh "mv dist/index.html ./"
                // 初始化目录
                sh "ssh -o StrictHostKeyChecking=no -i $identity $userName@${params.remote_host} mkdir -p ${params.nfs_project_dir}/${params.project_name}"		
                // 复制文件
                sh "scp -r -i $identity dist/* $userName@${params.remote_host}:${params.nfs_project_dir}/${params.project_name}"
                // 复制index.html
                sh "scp -r -i $identity index.html $userName@${params.remote_host}:${params.nfs_project_dir}/${params.project_name}"
                // 还原index.html
  				sh "mv index.html dist/index.html"
            }
          }
        }
      }
    }
}