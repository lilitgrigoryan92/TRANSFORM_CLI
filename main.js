const fs=require("fs")
const os=require("os")
const {Transform}=require("stream")


process.on("SIGINT",()=>{
    console.log(`Thank you ${username},good luck`)
    process.exit()
})

console.log("Transformed")


 function command(input,output,op){
    const readStream=fs.createReadStream(input)
    const writeStream=fs.createWriteStream(output)

    readStream.on("err",()=>{
        console.log("Error during reading")
    })

    readStream.on("end",()=>{
        writeStream.end()
    })

    writeStream.on("err",()=>{
        console.log("Error during writing")
    })


const transform= new Transform ({
        transform(chunk,enc,cb){
            let changed=chunk
            if (op==="uppercase"){
                
                     changed=chunk.toString().toUpperCase()
            }
            else if (op==="lowercase"){

                        changed=chunk.toString().toLowerCase()
            }
            else if (op==="reverse"){

                        changed=chunk.toString().split(" ").reverse().join()
               }
              else if (op==="replace"){
                changed=chunk.toString().replace(changed,"I love Epam")
               }
                else {
                    console.log("Incorrect operation.");
                    readStream.destroy();
                    writeStream.end();
                    return;
                  }
                      

              console.log("Transformed chunk:", changed);

            this.push(changed)
            cb()

            }
              
          })
            
    readStream.pipe(transform).pipe(writeStream).on("finish",()=>{
        console.log("Finished")
    })
  }

const input=process.argv[2]
const output=process.argv[3]
const op =process.argv[4]

command(input,output,op)
