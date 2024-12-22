import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp } from '@/utils/animation';

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="bg-dark-blue text-white py-5 mt-5" ref={ref}>
      <Container className="py-5">
        <Row className="align-items-center py-5">
          <Col lg={8} className="mx-auto text-center">
            <motion.div
              {...fadeInUp}
              animate={inView ? "animate" : "initial"}
            >
              <h1 className="display-4 fw-bold mb-4">
                Invest in US Stocks from India
              </h1>
              <p className="lead mb-5">
                Start investing in top US companies with CapX
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                className="px-5 py-3"
              >
                Sign up now
              </Button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;