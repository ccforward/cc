# 我理解的 Vinyl
vinyl 翻译过来叫乙烯基。。。。🤖

## Vinyl文件对象
知道 vinyl 完全是因为gulp，用了好久的 gulp 现在来简单研究下 vinyl。

### 什么是 Vinyl
Vinyl是用来描述文件的十分简单的元数据对象。当说道一个文件，我们会想到两个属性 `path` 和 `content`。这就是 Vinyl 对象的主要属性。一个文件并一定代表我们计算机上的东西，我们还有放在 FTP DropBox 云端上的文件。Vinyl就可以来描述所有这些来源的文件。

gulp用的是 [vinyl-fs](https://github.com/gulpjs/vinyl-fs) ，实现了实现了gulp.src()和gulp.dest()方法。同时 vinyl-fs 用的是 [vinyl](https://github.com/gulpjs/vinyl) 文件对象这种 『虚拟文件格式』。