import Product from '../models/product.js';


//create part
export async function createProduct(req, res) {

     console.log(req.user);

     if (req.user == null){
        res.json({
            message: "You are not logined in"
        });
        return;
     }

     if (req.user.type !== "admin") {
        res.json({
            message: "You are not an admin"
        });
        return;
     }
  

  const product = new Product(req.body);

  try {
    await product.save();
    res.json({
      message: "Product is created"
    });
  } catch (error) {
    res.json({
      message: "Product is not created"
    });
  }
}


//view all products
export async function getProduct(req,res){

    try {
        const productList = await Product.find()

        res.json({
          list : productList
       })
    }catch(err){
        res.json({
            message: "Error retrieving products"
        })
    }   
}

//delete by name
export async function deleteProduct(req, res) {
    try {
        await Product.deleteOne({ name: req.params.name });
        res.json({
            message: "Product deleted successfully"
        });
    } catch (err) {
        res.json({
            message: "Product not deleted"
        });
    }
}

//view by name
export async function getProductByName(req, res) {
    const name = req.params.name;

    try {
        const productList = await Product.find({ name: name });

        if (productList.length === 0) {
            res.json({
                message: "Product not found"
            });
        } else {
            res.json({
                list: productList
            });
        }
    } catch (error) {
        res.json({
            message: "Error"
        });
    }
}

