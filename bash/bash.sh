alias ls='ls -G'
alias ll='ls -lGh'
alias la='ls -lAGh'
# 主机ip
alias myip='ifconfig | grep inet\ '
# reload bash_profile文件
alias rlbs='. ~/.bash_profile'
#grep
alias grep='grep --color=always'
alias vi='mvim'

# show hide files
alias show='defaults write com.apple.finder AppleShowAllFiles -bool true'
alias hide='defaults write com.apple.finder AppleShowAllFiles -bool false'

#Apache的根目录
alias fk='cd /Library/WebServer/Documents/'

# 工具启动
alias fire='open /Applications/Sublime\ Text\ 2.app/ & open /Applications/Google\ Chrome.app'

#mysql
alias mysql=/usr/local/mysql/bin/mysql
alias mysqladmin=/usr/local/mysql/bin/mysqladmin

#git
alias gam="git add .;git commit -m"
alias glog='git log --graph --full-history --all --color --pretty=format:"%x1b[31m%h%x09%x1b[32m%d%x1b[0m%x20%s"'