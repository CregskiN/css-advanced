
/**
 * 不足： js操作的css 画面有抖动
 */

const imgs = {
    "data": [
        { "src": "./images/P_00.jpg" },
        { "src": "./images/P_01.jpg" },
        { "src": "./images/P_02.jpg" },
        { "src": "./images/P_03.jpg" },
        { "src": "./images/P_04.jpg" },
        { "src": "./images/P_05.jpg" },
        { "src": "./images/P_06.jpg" },
        { "src": "./images/P_07.jpg" },
        { "src": "./images/P_08.jpg" },
        { "src": "./images/P_09.jpg" },
        { "src": "./images/P_010.jpg" },
        { "src": "./images/P_011.jpg" },
        { "src": "./images/P_012.jpg" },
        { "src": "./images/P_013.jpg" },
        { "src": "./images/P_014.jpg" },
        { "src": "./images/P_015.jpg" },
        { "src": "./images/P_016.jpg" },
        { "src": "./images/P_017.jpg" },
        { "src": "./images/P_018.jpg" },
        { "src": "./images/P_019.jpg" }
    ]
}


window.onload = function () {
    waterfall();
    window.onscroll = function () {
        if (checkLazyLoad()) {
            const container = document.getElementById('container');
            for(let imgData of imgs.data){
                const box = document.createElement('div');
                box.className = 'box'
                container.appendChild(box);
                const pic = document.createElement('div');
                pic.className = 'pic';
                box.appendChild(pic);
                const img = document.createElement('img');
                img.src = imgData.src;
                pic.appendChild(img);
            }
            waterfall()
        }
    }

}

function waterfall() {
    // 取出class下所有box元素
    const containerNode = document.getElementById('container');
    const boxNodes = containerNode.getElementsByClassName('box')
    //计算列数
    const boxWidth = boxNodes[0].offsetWidth; // 202 = img的width165 + padding20 + border2 + padding15
    let cols = parseInt(document.documentElement.clientWidth / boxWidth);
    // 设置container的宽度和对齐方式
    containerNode.style.cssText = `width:${boxWidth * cols}px;margin: 0 auto;`;
    // 获取最小高度值和对应的node，并更改
    reLayout(boxNodes, cols, boxWidth);
}

/**
 *  获取每个元素offsetWith的值 = width + padding
 * @param {*} nodes 
 * @param {*} cols 
 */
function reLayout(nodes, cols, boxWidth) {
    let heights = [];
    for (let node of nodes) {
        if (heights.length < cols) {
            heights.push(node.offsetHeight);
        } else {
            adjustLayoutOfRow(node, heights, boxWidth, cols);
        }
    }
    return heights;
}

/**
 * 调整下一行布局，并实现heights更新
 */
function adjustLayoutOfRow(node, heights, boxWidth, cols) {
    const mHeight = getMinHeight(heights);
    const mIndex = heights.indexOf(mHeight);

    node.style.position = 'absolute';
    node.style.top = heights[mIndex] + 'px';
    node.style.left = boxWidth * mIndex + 'px';

    heights[mIndex] = mHeight + node.offsetHeight;
}

/**
 * 得到number[]中最小值
 * @param {*} heightArr 
 */
function getMinHeight(heightArr) {
    const mHeight = Math.min(...heightArr);
    return mHeight;
}

function checkLazyLoad() {
    const boxNodes = document.getElementsByClassName('box');
    const lastBoxNode = boxNodes[boxNodes.length - 1];
    const halfLastBoxToTop = parseInt(lastBoxNode.style.top) + parseInt(lastBoxNode.offsetHeight / 2);
    const clientHeight = document.documentElement.clientHeight;
    const scrollToTop = document.documentElement.scrollTop;
    return ((scrollToTop + clientHeight) >= halfLastBoxToTop);
}
