import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

function SignUp() {
  return (
    <React.Fragment>
      <div className="text-center mt-4">
        <h1 className="h2">Get started</h1>
        <p className="lead">
          Start creating the best possible user experience for you customers.
        </p>
      </div>

      <Card>
        <CardBody>
          <div className="m-sm-4">
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  size="lg"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Company</Label>
                <Input
                  size="lg"
                  type="text"
                  name="company"
                  placeholder="Enter your company name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  size="lg"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input
                  size="lg"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                />
              </FormGroup>
              <div className="text-center mt-3">
                <Link to="/">
                  <Button color="primary" size="lg">
                    Sign up
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default SignUp;
