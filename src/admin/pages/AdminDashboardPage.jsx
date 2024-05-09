import { useSelector } from 'react-redux';
import {
  mainSection,
  container,
  sectionContainer,
  dataBlock,
  dataCategoryBlock,
} from './styles/AdminDashboardPage.module.css';

export const AdminDashboardPage = () => {

  const { promos } = useSelector( state => state.promo );
  const { categories } = useSelector( state => state.category );
  const { totalProductsUser } = useSelector( state => state.productsUser );

  const activeProducts = totalProductsUser.filter( product => product.isSoldOut === false ).length;
  const soldOutProducts = totalProductsUser.filter( product => product.isSoldOut === true ).length;

  return (
    <main 
      className={` animationPage ${ mainSection } `}
    >
      <h2>Vista General</h2>
      <div
        className={ container }
      >
        <div
          className={ sectionContainer }
        >
          <div
            className={ dataBlock }
          >
            <h3>Productos</h3>
            <p><span>Total de productos:</span><span> { totalProductsUser.length } </span></p>
            <p><span>Productos activos:</span><span> { activeProducts } </span></p>
            <p><span>Productos agotados:</span><span> { soldOutProducts } </span></p>
          </div>
        </div>
      </div>
      <div
        className={ container }
      >
        <div
          className={ sectionContainer }
        >
          <div
            className={ dataBlock }
          >
            <h3>Categorías</h3>
            <p><span>Total de categorías:</span><span> { categories.length } </span></p>
            <div
              className={ dataCategoryBlock }
            >
              <div>
                Categorías actuales:
              </div>
              <div>
                {
                  categories.map( category => {
                    return (
                      <h4 key={ category._id }>&#183; { category.categoryTitle } </h4>
                    )
                  } )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={ container }
      >
        <div
          className={ sectionContainer }
        >
          <div
            className={ dataBlock }
          >
            <h3>Promociones</h3>
            <p><span>Total de promociones:</span><span> { promos.length } </span></p>
            <div
              className={ dataCategoryBlock }
            >
              <div>
                Promociones actuales:
              </div>
              <div>
                {
                  promos.map( promo => {
                    return (
                      <h4 key={ promo._id }>&#183; { promo.promoItem } </h4>
                    )
                  } )
                }
              </div>
            </div>
          </div>
        </div>
      </div>      
    </main>
  );
};

