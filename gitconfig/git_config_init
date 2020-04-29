#!/bin/bash

isWin=1
if [ -d /home ];
then
    isWin=0
fi

a=$(git --version)
a="${a##git version }"
a="${a%%.msysgit.*}"
git_version=`echo "$a" | sed 's/\.//g'`

#param $1 str
#param $2 file
ifEcho(){
    if [ $2 != "" ]; then
        if [ -f $2 ];then
            grep "$1" $2 | grep -v "^#" | grep -v "\nalias" > /dev/null
            if [ $? != 0 ]; then 
                echo "$1" >> $2
            fi
        else
            echo $1 > $2
        fi
    fi        
}

_setUserInfo(){
    name=`git config --list | grep user.name | sed s/user.name=//`
    emai=`git config --list | grep user.email | sed s/user.email=//`

    if [ ${#1} != 0 ]; then
        name=$1
    fi
    if [ ${#2} != 0 ]; then
        emai=$2
    fi


    echo "[INFO] Setting User Infomation ..."
    echo "       user.name=$name"
    echo "       user.email=$emai"
    git config --global user.name $name
    git config --global user.email $emai

    if [ $isWin = 1 ] ;
    then
	if((${git_version} < 1710))
	then
		iconv -f gbk -t utf-8 $HOME/.gitconfig > $HOME/gitconfigtpl
		rm -f $HOME/.gitconfig
		mv $HOME/gitconfigtpl $HOME/.gitconfig
	fi
    fi
}

_setEncoding(){    
    # git status support chinese 
    git config --global core.quotepath false
    echo "       core.quotepath=false"
    # commit message and log coding
    if [ $isWin = 1 ] ;
    then
        git config --global i18n.commitEncoding UTF-8
        echo "       i18n.commitEncoding=UTF-8"

	_winloe="gbk"
	if((${git_version} >= 1710))
	then
		_winloe="UTF-8"
	fi
        git config --global i18n.logOutputEncoding ${_winloe}
        echo "       i18n.logOutputEncoding=${_winloe}"
    else
        git config --global i18n.commitEncoding UTF-8
        #echo "       i18n.commitEncoding=UTF-8"
        git config --global i18n.logOutputEncoding UTF-8
        echo "       i18n.logOutputEncoding=UTF-8"
    fi
}

_setColor(){
    git config --global color.ui auto
    echo "       core.ui=auto"
    git config --global color.branch auto
    echo "       core.branch=auto"
    git config --global color.status auto
    echo "       core.status=auto"
    git config --global color.diff auto
    echo "       core.diff=auto"
}

_setAlias(){
    echo "[INFO] Setting Quick Alias ..."
    echo "       git st => git status"
    git config --global alias.st status
    echo "       git co => git checkout"
    git config --global alias.co checkout
    echo "       git br => git branch"
    git config --global alias.br branch
    echo "       git mg => git merge"
    git config --global alias.mg merge
    echo "       git ci => git commit"
    git config --global alias.ci commit
    echo "       git dt => git difftool"
    git config --global alias.dt difftool
    echo "       git mt => git mergetool"
    git config --global alias.mt mergetool
    echo "       git last => git log -1 HEAD"
    git config --global alias.last "log -1 HEAD"
}

_setEditor(){
    if [ $isWin = 1 ] ;
    then
        git config --global core.editor notepad2
        echo "[INFO] Setting Commit Editor => notepad2"
    else
        git config --global core.editor vim
        echo "[INFO] Setting Commit Editor => vim"
    fi
}

_setTools(){
    if [ $isWin = 1 ] ;
    then
        echo "[INFO] Setting Diff Tool => TortoiseMerge"
        git config --global diff.external git-diff-wrapper.sh
        git config --global diff.tool tortoise
        git config --global difftool.tortoise.cmd 'TortoiseMerge -base:"$LOCAL" -theirs:"$REMOTE"'
        git config --global difftool.prompt false
    fi

    if [ $isWin = 1 ] ;
    then
        echo "[INFO] Setting Merge Tool => TortoiseMerge"
        git config --global merge.tool tortoise
        git config --global mergetool.tortoise.cmd 'TortoiseMerge -base:"$BASE" -theirs:"$REMOTE" -mine:"$LOCAL" -merged:"$MERGED"'
        git config --global mergetool.prompt false
    fi
}
_setRes(){
    if [ -f $GIT_CMD/res/gitmessage ];then
        echo "[INFO] Setting Commit Message Template ..."
        cp -f $GIT_CMD/res/gitmessage $HOME/.gitmessage
        git config --global commit.template $HOME/.gitmessage
    fi

    if [ -f $GIT_CMD/res/gitignore ];then
        echo "[INFO] Setting Global \".gitignore\" File ..."
        cp -f $GIT_CMD/res/gitignore $HOME/.gitignore
        git config --global core.excludesfile $HOME/.gitignore
    fi
}

_setCRLF(){
    echo "[INFO] Setting CRLF ..."
    git config --global core.safecrlf false

    if [ $isWin = 1 ] ;
    then
        # auto transform CRLF <=> LF For Win32
        git config --global core.autocrlf true
    else
        # auto transform to LF when commit in linux, if the file in worktree has CRLF
        git config --global core.autocrlf input
    fi
}
_setOther(){
    echo "[INFO] Setting ignorecase ..."
    git config --global core.ignorecase true

    if [ $isWin = 1 ] ;
    then
        echo "[INFO] Setting LESSCHARSET ..."

        # git log support chinese 
        echo -e "export LESSCHARSET=utf-8 \nalias ls='ls --show-control-chars --color=auto'" > $HOME/.profile

        # allow write chinese in windows bash shell
	rm -f $HOME/.inputrc
	if((${git_version} < 1710))
	then
		echo -e "set output-meta on \nset convert-meta off" > $HOME/.inputrc
	fi
    else
        echo "[INFO] Setting Git Completion Script For Bash ..."
        #cp $GIT_CMD/res/git-completion.bash $HOME/.git-completion.bash
        #chmod +x $HOME/.git-completion.bash
        #ifEcho "source ~/.git-completion.bash" $HOME/.profile
        #source $HOME/.git-completion.bash
    fi
}
init(){
    _setUserInfo $1 $2
    _setEncoding
    _setColor
    _setAlias
    _setEditor
    _setTools
    _setRes
    _setCRLF
    _setOther
    echo "[INFO] Cool, Your Git Optimize Completed!"
}

init $1 $2
