import Storage from "./Storage";
import SubmissionsApi from "./SubmissionsApi";
import Messages from "./Messages";

const successDelay = 2500;
const failureDelay = 20000;
let pending = false,
    timer = null;

class SubmissionsQueue {

    static hasQueued() {
        let submission = Storage.getNextSubmission();

        return submission !== null;
    }

    static push(submission, isMissingDropsCallback) {
        let hasQueued = SubmissionsQueue.hasQueued();
        Storage.queueSubmission(submission);

        if (!hasQueued)
            SubmissionsQueue.sendNext(isMissingDropsCallback);
    }

    static scheduleNext(success) {
        if (pending)
            return;

        if (!SubmissionsQueue.hasQueued())
            return;

        pending = true;
        timer = setTimeout(() => {
            SubmissionsQueue.sendNext();
        }, success ? successDelay : failureDelay);
    }

    static sendNext(isMissingDropsCallback) {
        if (pending)
            clearTimeout(timer);
        pending = false;
        timer = null;

        let submission = Storage.getNextSubmission();

        if (submission === null) {
            SubmissionsQueue.scheduleNext(false);
            return;
        }

        SubmissionsApi.postSubmission(submission, (result) => {
            Messages.push("success", "Created new submission: " + result.receipt);
            Storage.shiftSubmissions();

            if (result.missing_drops && isMissingDropsCallback)
                isMissingDropsCallback();

            SubmissionsQueue.scheduleNext(true);
        }, (code) => {
            if (code === 422) {
                Messages.push("danger", "Invalid submission. Removing from queue.");
                Storage.shiftSubmissions();
            }

            SubmissionsQueue.scheduleNext(false);
        });
    }

}

export default SubmissionsQueue;