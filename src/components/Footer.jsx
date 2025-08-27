// src/components/Footer.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <footer
      className="text-white py-3"
      style={{
        background: "linear-gradient(90deg, #000610, #ae2929)",
        width: "100%",
        position: "fixed",   // keeps footer at bottom
        bottom: 0,           // aligns to bottom
        left: 0,
        zIndex: 1030,        // ensures it's above other elements
      }}
    >
      <Container fluid>

        {/* Bottom Line */}
        <Row>
          <Col className="text-center mt-2">
            <p className="small mb-0 text-light opacity-75">
              Designed for streamlined employee reimbursements | Built with React & Springboot
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
