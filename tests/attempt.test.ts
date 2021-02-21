import * as attempt from "@mbriggs/attempt";
import * as controls from "@mbriggs/attempt/controls";
import assert from "assert";

describe("Attempt", () => {
  describe("running without error", () => {
    it("suppresses error", () => {
      assert.doesNotReject(async () => {
        await attempt.run(controls.throws);
      });
    });

    it("suppresses error by type", () => {
      assert.doesNotReject(async () => {
        await attempt.run(controls.Example, controls.throws);
      });
    });

    it("doesn't suppress error when types dont match", () => {
      assert.rejects(async () => {
        await attempt.run(controls.Example, controls.throwsOther);
      });
    });

    it("suppresses error by type list", () => {
      assert.doesNotReject(async () => {
        await attempt.run([controls.Example], controls.throws);
      });
    });

    it("doesn't suppress error when type not in list", () => {
      assert.rejects(async () => {
        await attempt.run([controls.Example], controls.throwsOther);
      });
    });
  });

  describe("retrying", () => {
    it("tries again after error", () => {
      assert.doesNotReject(async () => {
        await attempt.retry(controls.throwsOnce());
      });
    });

    it("only tries once after error", () => {
      assert.rejects(async () => {
        await attempt.retry(controls.throws);
      });
    });

    it("retries on error by type", () => {
      assert.doesNotReject(async () => {
        await attempt.run(controls.Example, controls.throwsOnce());
      });
    });

    it("doesn't retry on error when types dont match", () => {
      assert.rejects(async () => {
        await attempt.run(controls.Example, controls.throwsOtherOnce());
      });
    });

    it("retries on error by type list", () => {
      assert.doesNotReject(async () => {
        await attempt.run([controls.Example], controls.throwsOnce());
      });
    });

    it("doesn't retry on error when type not in list", () => {
      assert.rejects(async () => {
        await attempt.run([controls.Example], controls.throwsOtherOnce());
      });
    });
  });
});
