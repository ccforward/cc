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
alias fire='open /Applications/Visual\ Studio\ Code.app/ & open /Applications/Google\ Chrome.app & open /Applications/Notes.app & open /Applications/ShadowsocksX.app & open /Applications/DingTalk.app & open /Applications/Dash.app'

#mysql
alias mysql=/usr/local/mysql/bin/mysql
alias mysqladmin=/usr/local/mysql/bin/mysqladmin

#apache
alias apaconf='sudo vim /etc/apache2/httpd.conf'

#git
alias gam="git add -A;git commit -m"
alias gst="git st"
alias gpush='git push origin $(git rev-parse --abbrev-ref HEAD)'
alias gpull='git pull origin $(git rev-parse --abbrev-ref HEAD)'
alias glogq='git log --graph --full-history --all --color --pretty=format:"%x1b[31m%h%x09%x1b[32m%d%x1b[0m%x20%s"'
alias glog="git log --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
alias gaa='git add --all'
alias gcl='git clone'
alias gc-='git co -'
