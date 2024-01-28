"use client"
import { products, carts, comments, users } from '@/database/database';
import { Cart } from '@/models/Cart';
import { User } from '@/models/User';
import { Comment } from '@/models/Comment';
import { useStores } from '@/stores/useStores';
import { observer } from 'mobx-react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SingleBuyerProduct = observer(() => {
    const { userStore } = useStores()
    const [numberOfElements, setNumberOfElements] = useState(0)
    const [productComments, setProductComments] = useState<Comment[] | undefined>(undefined)
    const [loggedUser, setLoggedUser] = useState<User | null>(null)
    const [newComment, setNewComment] = useState("")
    const pathname = usePathname();
    const pathSegments = pathname.split('/');
    const productId = pathSegments[pathSegments.length - 1];
    const product = products.find((p) => p.id.toString() === productId);
    
    
    useEffect(() =>  {
        const loggedUser: User | null = JSON.parse(localStorage.getItem("user")!);
        setLoggedUser(loggedUser);
        setProductComments(comments?.filter(comment => comment.productId == parseInt(productId)))
    }, []);

    const handleInputChange = (value: string) => {
       setNewComment(value)
      };
    
    const handlePlusButton = () => {
        setNumberOfElements(numberOfElements + 1)
    }

    const handleMinusButton = () => {
        if(numberOfElements > 0)  setNumberOfElements(numberOfElements - 1)
    }

    const addToCart = () => {
        if(numberOfElements == 0) return
        const userCartIndex = carts.findIndex(cart => cart.userId === userStore.loggedUser?.id);

        if (userCartIndex !== -1) {
            carts[userCartIndex].hashmapOfProducts.set(parseInt(productId), (carts[userCartIndex].hashmapOfProducts.get(product!.id) || 0) + numberOfElements);
        } 
        else {
            const newCart = new Cart(userStore.loggedUser?.id ?? 0, new Map([[product!.id, numberOfElements]]));
            carts.push(newCart);
        }

        setNumberOfElements(0);
    }

    const addComment = () => {
        if(newComment != ""){
            const newCommentObject: Comment = new Comment(loggedUser?.id ?? 0, parseInt(productId), newComment);
            comments.push(newCommentObject)
            setNewComment("")
        }
    }

    return (
        <div className='singleProductContainer'>
            <div className='singleProductFirstColumn'>
                <h1>{product?.name}</h1>
                <img
                    src={product?.pictureURL}
                    alt={product?.name}
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                />

                <div className='descriptionWrapper'>
                    <p>{product?.description}</p>
                </div>

                <div className='buttonsContainer'>
                    <div className='svgCartContainer'>
                        <svg onClick={() => handleMinusButton()} fill="#000000" height="50px" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 310.285 310.285" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M155.143,0.001C69.597,0.001,0,69.597,0,155.143c0,85.545,69.597,155.142,155.143,155.142s155.143-69.597,155.143-155.142 C310.285,69.597,240.689,0.001,155.143,0.001z M244.143,171.498c0,4.411-3.589,8-8,8h-163c-4.411,0-8-3.589-8-8v-32 c0-4.411,3.589-8,8-8h163c4.411,0,8,3.589,8,8V171.498z"></path> </g></svg>
                        <p>X{numberOfElements}</p>
                        <svg onClick={() => handlePlusButton()} fill="#000000" height="50px" width="50px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 45.402 45.402" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"></path> </g> </g></svg>
                    </div>
                    <div className='cartButton'>
                        <button className='submitButton' onClick={() => addToCart()}>Dodaj u korpu</button>
                    </div>
                </div>
            </div>

            <div className='singleProductSecondColumn'>
                <h1 style={{textAlign: "center"}}>Komentari</h1>
                <div className='allComentsForProduct'>
                    {comments && comments.map((comment, index) => (
                        <div className='commentsWrapper' key={index}>
                            <label>
                                {users.find(user => user.id == comment.userId)?.username}
                                <input
                                    type='text'
                                    value={comment.text}
                                    readOnly
                                />
                            </label>
                        </div>
                    ))}
                     <div className='commentsWrapper newComment'>
                      <input
                        type='text'
                        value={newComment}
                        onChange={(e) => handleInputChange(e.target.value)}
                        />
                    </div>

                    <button className='submitButton' onClick={() => addComment()}>Dodaj komentar</button>
                </div>
            </div>
        </div>
    );
})

export default SingleBuyerProduct;