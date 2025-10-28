import Interaction from "../Models/interactionModel.js"


export const registerInteraction = async (userModel, productModel, feedbackType) =>{
    try{

        const weights = {
            favorite: 1.5,
            wishlist: 1.0,
            view: 0.5,
            read: 2.0,
            purchase: 2.0
        };

        const existing = await Interaction.findOne({user_id: userModel, product_id: productModel});

        if (existing){
            existing[feedbackType] = 1;
            
            let total_score = 0;
            for(const[key, weight] of Object.entries(weights)){
                if(existing[key] === 1){
                    total_score += weight;
                }
            }

            existing.score = ((total_score/7.0)*5.0).toFixed(2);
            await existing.save()
        }


        else{
        const newInteraction = {
            user_id: userModel,
            product_id: productModel,
            read: 0,
            favorite: 0,
            wishlist: 0,
            purchase: 0,
            view: 0,
            [feedbackType]: 1
        };

        newInteraction.score = ((weights[feedbackType]/7.0)*5.0).toFixed(2);

        await Interaction.create(newInteraction)

        } 

    
    }catch (err){

        console.error("Error al registrar la interaccion", err);
        
    }
}