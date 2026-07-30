import React from 'react';
import { Row, Col, Card, Table, Form, InputGroup, Pagination } from 'react-bootstrap';
import { FiSearch, FiFilter, FiPlus, FiMoreVertical, FiFileText, FiShoppingCart, FiClock, FiRotateCcw } from 'react-icons/fi';
import MyButton from './components/Button';

const OrdersPage = () => {
  // Hàm render Badge trực tiếp trong file này
  const renderBadge = (type: string) => {
    const styles: any = {
      'Hoàn thành': { bg: '#e6f4ea', color: '#1e7e34' },
      'Đang xử lý': { bg: '#e8f0fe', color: '#1967d2' },
      'Đã hủy': { bg: '#fce8e6', color: '#d93025' },
      'Tiền mặt': { bg: '#e7f3ff', color: '#0064d2' },
      'Chuyển khoản': { bg: '#f3e8ff', color: '#6b21a8' },
    };
    const style = styles[type] || { bg: '#f1f3f4', color: '#3c4043' };
    return (
      <span style={{ backgroundColor: style.bg, color: style.color, padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', display: 'inline-block' }}>
        {type}
      </span>
    );
  };

  return (
    <div className="p-4">
      {/* Header Thống kê */}
      <Row className="mb-4">
        {[
          { label: 'Tổng đơn hàng', val: '246', trend: '+ 16.8%', icon: <FiFileText />, color: '#0064d2' },
          { label: 'Đơn hoàn thành', val: '198', trend: '+ 14.3%', icon: <FiShoppingCart />, color: '#1e7e34' },
          { label: 'Đang xử lý', val: '32', trend: '+ 8.2%', icon: <FiClock />, color: '#f2994a' },
          { label: 'Đã hủy', val: '16', trend: '- 4.7%', icon: <FiRotateCcw />, color: '#d93025' },
        ].map((item, idx) => (
          <Col key={idx} md={3}>
            <Card className="border-0 shadow-sm p-3">
              <div className="d-flex align-items-center gap-3">
                <div style={{ fontSize: '24px', color: item.color, backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '10px' }}>{item.icon}</div>
                <div>
                  <div className="text-muted small">{item.label}</div>
                  <div className="h4 fw-bold mb-0">{item.val}</div>
                  <small className={item.trend.includes('+') ? 'text-success' : 'text-danger'}>{item.trend} <span className="text-muted">so với hôm qua</span></small>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Toolbar Nút Bấm */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        <MyButton customVariant="secondary" icon={<FiPlus />}>Tạo đơn OCR</MyButton>
        <MyButton customVariant="primary" icon={<FiFilter />}>Lọc</MyButton>
      </div>

      <Row>
        {/* Bảng danh sách */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold">Danh sách đơn hàng</h5>
              <InputGroup style={{ width: '300px' }}>
                <InputGroup.Text className="bg-white"><FiSearch className="text-muted"/></InputGroup.Text>
                <Form.Control placeholder="Tìm theo mã đơn..." />
              </InputGroup>
            </div>
            <Table responsive hover>
              <thead>
                <tr className="text-muted small">
                  <th>STT</th><th>Mã đơn hàng</th><th>Khách hàng</th><th>Trạng thái</th><th>Tổng tiền</th><th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stt: 1, id: '#2', name: 'Khách vãng lai', pay: 'Tiền mặt', status: 'Hoàn thành', price: '308.000đ', active: true },
                  { stt: 2, id: '#1', name: 'Nguyễn Văn A', pay: 'Tiền mặt', status: 'Đang xử lý', price: '256.000đ' },
                  { stt: 3, id: '#200', name: 'Trần Thị B', pay: 'Chuyển khoản', status: 'Hoàn thành', price: '450.000đ' },
                ].map((row, i) => (
                  <tr key={i} style={row.active ? { backgroundColor: '#f0f7ff' } : {}}>
                    <td>{row.stt}</td>
                    <td><div className="fw-bold">{row.id}</div><small className="text-muted">11:49 29/06/2026</small></td>
                    <td><div className="fw-bold">{row.name}</div>{renderBadge(row.pay)}</td>
                    <td>{renderBadge(row.status)}</td>
                    <td className="fw-bold">{row.price}</td>
                    <td><FiMoreVertical className="text-muted" /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>

        {/* Chi tiết đơn hàng */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm p-3">
            <div className="d-flex justify-content-between mb-3">
              <h5 className="fw-bold">Chi tiết đơn #2</h5>
              {renderBadge('Hoàn thành')}
            </div>
            <div className="text-muted small mb-3 border-bottom pb-2">11:49 29/06/2026</div>
            {[1, 2, 3].map(i => (
              <div key={i} className="d-flex justify-content-between mb-3">
                <div className="small"><div className="fw-bold">Pizza 4 vị phô mai - S</div><div className="text-muted">59.000đ</div></div>
                <div className="fw-bold">59.000đ</div>
              </div>
            ))}
            <div className="border-top pt-3">
              <div className="d-flex justify-content-between mb-1"><span>Tổng</span><span>308.000đ</span></div>
              <div className="d-flex justify-content-between mb-1"><span>Giảm giá</span><span>0đ</span></div>
              <div className="d-flex justify-content-between mb-3 text-muted"><span>VAT</span><span>0đ</span></div>
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0">Tổng tiền</h6>
                <h5 className="text-danger fw-bold mb-0">308.000đ</h5>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrdersPage;