## git force push后丢失的文件

git` 有很大的撤消堆栈： `git reflog

您可能会在以下两个位置之一中找到“覆盖”的提交的sha1：

-   `git reflog` ：曾经是您正在处理的活动提交的所有提交的历史记录
-   `git reflog origin/master`（或`git reflog origin/anybranch`）：您去过的所有地点的历史记录`origin/master`，每次您运行`git fetch`或`git pull`

拥有此sha1后，您可以：

-   在此基础上重新构建： `git rebase sha1`
-   获取文件的先前内容并对其进行处理： `git checkout sha1 -- the/file`