 require 'net/http'
 require 'open-uri'

con = Array.new
File.open("img.txt", "r") do |file|
    while line  = file.gets
       con.push(line)
    end
end

name = 0
for i in con do
    data = open(i){|f|f.read}
    open(name.to_s + '.jpg', 'wb'){|f|f.write(data)}
    name = name +1
    print name
end
