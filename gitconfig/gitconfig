#!/bin/bash

export GIT_CMD=`dirname $0`

if [ $# != 0 ]; then
    if [ ${1} = "update" ]; then
        $GIT_CMD/git_config_update $2 $3 $4
    fi

    if [ ${1} = "init" ]; then
        $GIT_CMD/git_config_init $2 $3 $4
    fi

fi
