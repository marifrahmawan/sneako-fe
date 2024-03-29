import { ReactNode } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";

import FlyoutCartItem from "./FlyoutCartItem";
import { useAppSelector } from "@/utils/redux/hooks";
import { Link } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const FlyoutCart = (props: IProps) => {
  const { children } = props;

  const cartData = useAppSelector((state) => state.cart);

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        {cartData?.map((product) => (
          <FlyoutCartItem
            key={product._id}
            _id={product._id}
            productId={product.productId}
            productName={product.productName}
            productPicture={product.productPicture}
            productColor={product.color}
            productSize={product.size}
            productDimension={product.dimension}
            productQuantity={product.quantity}
            productPrice={product.price}
          />
        ))}

        <div className="absolute bottom-3 w-full pr-12">
          <div className="flex w-full flex-col items-center">
            <Link to="/cart" className="w-full">
              <Button className="mb-4 w-full rounded-lg py-3 font-medium">
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FlyoutCart;
