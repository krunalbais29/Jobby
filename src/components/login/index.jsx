import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Matter from "matter-js";
import "./index.css";

const Login = () => {
  const sceneRef = useRef(null);
  const navigate = useNavigate();
  const token = Cookies.get("jwt_token");

  const [allValues, setValues] = useState({
    username: "",
    password: "",
    errorMsg: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();

    const userDetails = {
      username: allValues.username,
      password: allValues.password,
    };

    const api = "https://apis.ccbp.in/login";

    const option = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(api, option);
      const data = await response.json();

      if (response.ok) {
        setValues({ ...allValues, errorMsg: "" });
        Cookies.set("jwt_token", data.jwt_token);
        navigate("/");
      } else {
        setValues({ ...allValues, errorMsg: data.error_msg });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token !== undefined) {
      navigate("/");
    }
  }, [token, navigate]);

  // ---- Matter.js Timescale Animation ----
  useEffect(() => {
    const {
      Engine,
      Render,
      Runner,
      Body,
      Events,
      Composite,
      Composites,
      Common,
      MouseConstraint,
      Mouse,
      Bodies,
    } = Matter;

    // create engine
    const engine = Engine.create();
    const world = engine.world;

    // create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        background: "#111",
        wireframes: false,
      },
    });

    Render.run(render);

    // create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // walls
    Composite.add(world, [
      Bodies.rectangle(window.innerWidth / 2, 0, window.innerWidth, 50, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 50, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 50, window.innerHeight, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(0, window.innerHeight / 2, 50, window.innerHeight, {
        isStatic: true,
        render: { visible: false },
      }),
    ]);

    // explosion effect
    const explosion = (engine, delta) => {
      const timeScale = (1000 / 60) / delta;
      const bodies = Composite.allBodies(engine.world);

      for (let body of bodies) {
        if (!body.isStatic && body.position.y >= window.innerHeight - 100) {
          const forceMagnitude = 0.05 * body.mass * timeScale;
          Body.applyForce(body, body.position, {
            x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
            y: -forceMagnitude + Common.random() * -forceMagnitude,
          });
        }
      }
    };

    let timeScaleTarget = 1;
    let lastTime = Common.now();

    Events.on(engine, "afterUpdate", (event) => {
      const timeScale = (event.delta || 1000 / 60) / 1000;

      // smooth tween effect
      engine.timing.timeScale += (timeScaleTarget - engine.timing.timeScale) * 12 * timeScale;

      // every 2 sec trigger explosion
      if (Common.now() - lastTime >= 2000) {
        timeScaleTarget = timeScaleTarget < 1 ? 1 : 0;
        explosion(engine, event.delta);
        lastTime = Common.now();
      }
    });

    // add shapes (mixed circles, rectangles, polygons)
    const bodyOptions = { frictionAir: 0, friction: 0.0001, restitution: 0.8 };

    Composite.add(world,
      Composites.stack(20, 100, 15, 3, 20, 40, (x, y) =>
        Bodies.circle(x, y, Common.random(10, 20), bodyOptions)
      )
    );

    Composite.add(world,
      Composites.stack(50, 50, 8, 3, 0, 0, (x, y) => {
        switch (Math.round(Common.random(0, 1))) {
          case 0:
            if (Common.random() < 0.8) {
              return Bodies.rectangle(x, y, Common.random(20, 50), Common.random(20, 50), bodyOptions);
            } else {
              return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(20, 30), bodyOptions);
            }
          case 1:
            return Bodies.polygon(x, y, Math.round(Common.random(4, 8)), Common.random(20, 50), bodyOptions);
          default:
            return Bodies.circle(x, y, 30, bodyOptions);
        }
      })
    );

    // mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
  // 1. New outer Flex container for vertical centering
  <div
    style={{
      minHeight: "100vh", // Ensure it takes full viewport height
      display: "flex",
      flexDirection: "column", // Stack items vertically
      justifyContent: "center", // Center vertically
      alignItems: "center", // Center horizontally
      padding: "20px", // Add some padding for small screens
    }}
  >
    {/* Background Animation */}
    <div
      ref={sceneRef}
      style={{
        position: "fixed", // Use 'fixed' to keep it static in the background
        top: 0,
        left: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    />

    {/* Login Form */}
    <div
      className="bg-dark text-white p-4 border border-dark rounded-3"
      style={{
        position: "relative", // Ensure it's on top of the animation
        zIndex: 1,
        width: "100%", // Take full width on small screens
        maxWidth: "500px", // Set max width for large screens
        // Remove the old 'margin: "10% auto"', Flexbox handles centering
      }}
    >
      {/* ... rest of the form content ... */}
      <form className="" onSubmit={onLogin}>
        <h2 className="text-center mb-3">Login Form</h2>

        <label htmlFor="username">Username</label>
        <input
          className="form-control mb-3"
          type="text"
          id="username"
          value={allValues.username}
          onChange={(e) =>
            setValues({ ...allValues, username: e.target.value })
          }
          placeholder="rahul"
        />

        <label htmlFor="password">Password</label>
        <input
          className="form-control mb-3"
          type="password"
          id="password"
          value={allValues.password}
          onChange={(e) =>
            setValues({ ...allValues, password: e.target.value })
          }
          placeholder="rahul@2021"
        />

        <button type="submit" className="btn btn-primary w-25">
          Login
        </button>

        {allValues.errorMsg && (
          <p className="text-danger mt-2">{allValues.errorMsg}</p>
        )}
      </form>
    </div>
  </div>
);
};

export default Login;
