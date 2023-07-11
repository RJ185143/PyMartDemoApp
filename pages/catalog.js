import { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { UserStoreContext } from '~/context/userStore';
import ItemCard from '~/components/public/ItemCard';
import useCatalog from '~/lib/swr/useCatalog';
import Layout from '~/components/public/Layout';
import { useRouter } from 'next/router';

export default function Catalog() {
  const router = useRouter();
  const { userStore } = useContext(UserStoreContext);
  const { query, page } = router.query;
  const { data, isLoading, isError } = useCatalog(userStore.id, query, page);
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    }
  }, [currentPage]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container my-4 flex-grow-1">
          <div className="row row-cols-md-3">
            {[...Array(8).keys()].map((index) => (
              <div className="col-sm-6 col-md-3 mb-4" key={index}>
                <ItemCard />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="container my-4 flex-grow-1">
          <p className="text-muted">{`Uhoh, we've hit an error.`}</p>
        </div>
      </Layout>
    );
  }

  const catalogItems = data.catalogItems.data.pageContent.filter((item) => item.itemAttributes != null);

  return (
    <Layout logs={data && data.logs ? data.logs : []} title="Catalog">
      <div className="container my-4 flex-grow-1">
        <Row>
          {catalogItems.map((item) => (
            <Col sm="6" md="3" className="mb-4" key={item.item.itemId.itemCode}>
              <ItemCard catalogItem={item} />
            </Col>
          ))}
        </Row>
        <a href={'?page=' + (currentPage - 1)} className="previous">
          &laquo; Previous
        </a>
        <a href={'?page=' + (currentPage + 1)} className="next">
          Next &raquo;
        </a>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query.query ? context.query.query : null
    }
  };
}
