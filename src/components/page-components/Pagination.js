import React from 'react';
import { Pagination as AntPagination } from 'antd';
import '../pages/styles/disks_style.css';

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  return (
    <AntPagination
      current={currentPage}
      total={totalItems}
      pageSize={itemsPerPage}
      onChange={paginate}
      showSizeChanger={false} // 
      showQuickJumper={false} // 
      showTotal={(total, range) => `${range[0]}-${range[1]} из ${total} элементов`}
    />
  );
}

export default Pagination;